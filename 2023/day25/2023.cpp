#include <algorithm>
#include <chrono>
#include <fstream>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

// Alias para simplificar el código
using M = map<string, vector<string>>;

// Función que elimina una conexión (relación) entre dos elementos en el mapa
void cut(M &map, const string &a, const string &b) {
    // Elimina `b` de la lista asociada a `a`
    if (map.count(a)) {
        map[a].erase(remove(map[a].begin(), map[a].end(), b), map[a].end());
    }
    // Elimina `a` de la lista asociada a `b`
    if (map.count(b)) {
        map[b].erase(remove(map[b].begin(), map[b].end(), a), map[b].end());
    }
}

// Función que cuenta todas las conexiones alcanzables desde un nodo
vector<string> count(const M &map, const string &a, vector<string> cs = {}) {
    // Si el nodo no existe o ya fue visitado, retorna la lista actual
    if (!map.count(a))
        return cs;
    if (find(cs.begin(), cs.end(), a) != cs.end())
        return cs;

    // Marca el nodo como visitado
    cs.push_back(a);

    // Recursivamente explora las conexiones del nodo
    for (const auto &c : map.at(a)) {
        cs = count(map, c, cs);
    }
    return cs;
}

// Función que separa el mapa en componentes conectados
vector<vector<string>> check(const M &map) {
    vector<vector<string>> lists; // Lista de componentes conectados
    set<string> checked;          // Conjunto de nodos ya verificados

    // Itera por cada nodo del mapa
    for (const auto &pair : map) {
        const string &k = pair.first;

        // Si el nodo ya fue verificado, continúa
        if (checked.count(k))
            continue;

        // Encuentra todos los nodos conectados a `k`
        vector<string> cnt = count(map, k);

        // Marca todos los nodos conectados como verificados
        checked.insert(cnt.begin(), cnt.end());

        // Verifica si la conexión ya está incluida en una lista existente
        bool included = false;
        for (const auto &l : lists) {
            if (find(l.begin(), l.end(), k) != l.end()) {
                included = true;
                break;
            }
        }

        // Si no está incluida, agrega esta nueva conexión a la lista
        if (!included)
            lists.push_back(cnt);
    }
    return lists;
}

// Función que intenta verificar combinaciones de cortes y retorna el tamaño del
// resultado
int verify(M &map, const vector<string> &keys, int &iterations) {
    // Itera sobre todos los pares de nodos y sus combinaciones para realizar
    // cortes
    for (size_t i = 0; i < keys.size() - 1; ++i) {
        const auto &i_vals = map[keys[i]];

        for (size_t ii = 0; ii < i_vals.size() - 1; ++ii) {
            M i_map = map;
            cut(i_map, keys[i], i_vals[ii]);

            for (size_t j = 0; j < keys.size(); ++j) {
                const auto &j_vals = map[keys[j]];

                for (size_t jj = 0; jj < j_vals.size() - 1; ++jj) {
                    M j_map = i_map;
                    cut(j_map, keys[j], j_vals[jj]);

                    for (size_t k = 0; k < keys.size() - 1; ++k) {
                        const auto &k_vals = map[keys[k]];

                        for (size_t kk = 0; kk < k_vals.size() - 1; ++kk) {
                            if (keys[k] == k_vals[kk] || keys[k] == keys[i] ||
                                keys[k] == keys[j])
                                continue;

                            M k_map = j_map;
                            cut(k_map, keys[k], k_vals[kk]);

                            // Verifica si el mapa resultante tiene exactamente
                            // 2 componentes conectadas
                            auto c = check(k_map);
                            iterations++;
                            if (c.size() != 2)
                                continue;

                            // Retorna el producto de los tamaños de las dos
                            // componentes
                            return c[0].size() * c[1].size();
                        }
                    }
                }
            }
        }
    }
    return -1; // Si no encuentra una solución válida
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }

    // Abre el archivo de entrada
    ifstream file(argv[1]);
    if (!file) {
        cerr << "Failed to open file: " << argv[1] << endl;
        return 1;
    }

    // Lee todo el contenido del archivo
    stringstream buffer;
    buffer << file.rdbuf();
    string input = buffer.str();

    // Elimina caracteres no deseados (por ejemplo, \r)
    input.erase(remove(input.begin(), input.end(), '\r'), input.end());

    // Divide el contenido en líneas
    vector<string> lines;
    stringstream ss(input);
    string line;
    while (getline(ss, line)) {
        lines.push_back(line);
    }

    // Inicia el temporizador
    auto start = chrono::high_resolution_clock::now();

    // Construye el mapa de relaciones a partir de las líneas de entrada
    M comps;
    for (const auto &l : lines) {
        size_t pos = l.find(':');
        string key = l.substr(0, pos);         // Parte antes de ":"
        string values_str = l.substr(pos + 1); // Parte después de ":"

        // Divide los valores por espacios
        values_str.erase(remove(values_str.begin(), values_str.end(), '\r'),
                         values_str.end());
        stringstream value_stream(values_str);
        vector<string> values;
        string value;
        while (value_stream >> value) {
            values.push_back(value);
        }

        // Actualiza las relaciones en el mapa
        if (!comps.count(key))
            comps[key] = values;
        else
            comps[key].insert(comps[key].end(), values.begin(), values.end());

        for (const auto &v : values) {
            if (!comps.count(v))
                comps[v] = {key};
            else
                comps[v].push_back(key);
        }
    }

    // Obtiene todas las claves del mapa
    vector<string> keys;
    for (const auto &pair : comps) {
        keys.push_back(pair.first);
    }

    // Realiza la verificación y mide las iteraciones
    int iterations = 0;
    cout << verify(comps, keys, iterations)
         << endl;               // Imprime el resultado del cálculo
    cout << iterations << endl; // Imprime la cantidad de iteraciones realizadas

    // Mide el tiempo transcurrido
    auto end = chrono::high_resolution_clock::now();
    cout << chrono::duration<double, milli>(end - start).count() << "ms"
         << endl;

    return 0;
}

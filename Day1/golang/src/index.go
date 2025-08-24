// package main

// import (
// 	"fmt"
// 	"net/http"
// )

// func handler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello, World! This is my first go server")

// }

// func main() {
// 	http.HandleFunc("/", handler)
// 	fmt.Println("Server starting on http://localhost:8080")
// 	http.ListenAndServe(":8080", nil)
// }

package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World! This is my First go server ")
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("Server starting on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}

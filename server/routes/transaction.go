package routes

import (
	"be-waysbeans/handlers"
	"be-waysbeans/pkg/middleware"
	"be-waysbeans/pkg/mysql"
	"be-waysbeans/repositories"

	"github.com/gorilla/mux"
)

func Transaction(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", middleware.Auth(h.FindTransactions)).Methods("GET")
	r.HandleFunc("/transaction-id", middleware.Auth(h.GetTransaction)).Methods("GET")
	r.HandleFunc("/transaction", middleware.Auth(h.CreateTransaction)).Methods("POST")
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.DeleteTransaction)).Methods("DELETE")
	r.HandleFunc("/transactionID", middleware.Auth(h.UpdateTransaction)).Methods("PATCH")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
	r.HandleFunc("/transaction-status", middleware.Auth(h.FindbyIDTransaction)).Methods("GET")
	r.HandleFunc("/transaction1", middleware.Auth(h.AllProductById)).Methods("GET")
}
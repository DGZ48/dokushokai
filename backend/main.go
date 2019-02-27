package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
	"github.com/gorilla/mux"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/option"
	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
)

func privateHandler(w http.ResponseWriter, r *http.Request) {

	ctx := appengine.NewContext(r)
	auth := authByFirebase(ctx)
	authHeader := r.Header.Get("Authorization")
	idToken := strings.Replace(authHeader, "Bearer ", "", 1)
	_, err := auth.VerifyIDToken(context.Background(), idToken)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprintln(w, "auth error")
		return
	}

	fmt.Fprintln(w, "private")
	return

}

func publicHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "public")
}

func optionHandler(w http.ResponseWriter, r *http.Request) {
	ctx := appengine.NewContext(r)
	log.Infof(ctx, "OPTION")
	return
}

func authByFirebase(ctx context.Context) *auth.Client {

	creds, err := google.CredentialsFromJSON(ctx, []byte(os.Getenv("FIREBASE_CREDENTIALS")))
	if err != nil {
		log.Criticalf(ctx, "error: %v\n", err)
		os.Exit(1)
	}
	opt := option.WithCredentials(creds)
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Criticalf(ctx, "error: %v\n", err)
		os.Exit(1)
	}
	auth, err := app.Auth(ctx)
	if err != nil {
		log.Criticalf(ctx, "error: %v\n", err)
		os.Exit(1)
	}

	return auth
}

func headerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST")

		next.ServeHTTP(w, r)
	})
}

func main() {
	router := mux.NewRouter()
	router.Use(headerMiddleware)

	router.Methods("OPTIONS").HandlerFunc(optionHandler)
	router.HandleFunc("/private", privateHandler).Methods("GET")
	router.HandleFunc("/", publicHandler).Methods("GET")

	http.Handle("/", router)
	appengine.Main()
}

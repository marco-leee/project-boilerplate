package env

import (
	"log"
	"os"
)

func GetEnv(key string, defaultValue string) string {
	value, isSet := os.LookupEnv(key)
	if value == "" || !isSet {
		return defaultValue
	}
	return value
}

func GetMustHaveEnv(key string) string {
	value := os.Getenv(key)
	if value == "" {
		log.Fatalf("Environment variable %s is not set", key)
		os.Exit(1)
	}
	return value
}

package config

import (
	"log"
	"os"
)

const prefix = "REBLOG_"

var DEV bool

var DB_TYPE string
var DB_DSN string

func GetEnv(key string) string {
	return os.Getenv(prefix + key)
}

func InitConfig() {
	DEV = GetEnv("DEV") == "true"

	if DEV {
		log.Println("以调试模式运行")
		DB_TYPE = "sqlite3"
	} else {
		DB_TYPE = GetEnv("DB_TYPE")
	}

	if DB_TYPE == "" {
		DB_TYPE = "sqlite3"
	}

	DB_DSN = GetEnv("DB_DSN")
}
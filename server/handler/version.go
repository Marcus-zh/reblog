package handler

import (
	"reblog/internal/core"
	"reblog/internal/version"
	"reblog/server/common"
	"runtime"

	"github.com/gofiber/fiber/v3"
)

type RespVersion struct {
	AppName string `json:"app_name"`
	Version string `json:"version"`
	Commit  string `json:"commit"`
	Runtime string `json:"runtime"`
}

//	@Summary		获取reblog版本信息
//	@Description	获取reblog版本信息
//	@Tags			版本
//	@Success		200	{object}	common.Resp{data=RespVersion}
//	@Router			/site [get]
func Version(app *core.App, router fiber.Router) {
	router.Get("/version", func(c fiber.Ctx) error {
		return common.RespSuccess(c, "操作成功", RespVersion{
			AppName: version.GetAppName(),
			Version: version.Version,
			Commit:  version.Commit,
			Runtime: runtime.Version(),
		})
	})
}

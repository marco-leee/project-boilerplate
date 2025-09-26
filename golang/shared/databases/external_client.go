package databases

import (
	"context"
	designpattern "golang-boilerplate/shared/design_pattern"
)

type ExternalClient[T any] struct {
	*designpattern.Singleton[T]
}

type IExternalClient[T any] interface {
	GetClient(ctx context.Context) (T, error)
	Connect(ctx context.Context) error
	Close(ctx context.Context) error
	IsConnected(ctx context.Context) bool
}

package algorithm

import "context"

type IStrategy[T any] interface {
	Execute(ctx context.Context) (T, error)
}

type IStrategyFactory[T any] interface {
	CreateStrategy(ctx context.Context, name string) (IStrategy[T], error)
}

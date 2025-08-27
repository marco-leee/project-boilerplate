package algorithm

import "context"

type Strategy[T any] interface {
	Execute(ctx context.Context) (T, error)
}

type StrategyFactory[T any] interface {
	CreateStrategy(ctx context.Context, name string) (Strategy[T], error)
}

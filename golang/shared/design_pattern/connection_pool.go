package designpattern

import (
	"errors"
	"fmt"
	"sync"
)

// Base pool with factory support
type Pool[T any] struct {
	pool    sync.Pool
	factory Factory[T]
}

// Pool interface
type IPool[T any] interface {
	GetOrCreate() (T, error)
	Put(t T)
	// SetFactory(factory Factory[T])
}

func (p *Pool[T]) GetOrCreate() (T, error) {
	if p.factory == nil {
		return *new(T), errors.New("factory is nil")
	}

	value := p.pool.Get()

	if value == nil {
		return p.factory.Create(), nil
	}

	// Safe type assertion
	if _, ok := value.(T); !ok {
		fmt.Println("typedValue is not of type T, replacing with new instance")
		return p.factory.Create(), nil

	}
	return value.(T), nil
}

func (p *Pool[T]) Put(t T) {
	p.pool.Put(t)
}

// func (p *Pool[T]) SetFactory(factory Factory[T]) {
// 	p.factory = factory
// }

func NewPool[T any](factory Factory[T]) IPool[T] {
	return &Pool[T]{
		pool:    sync.Pool{},
		factory: factory,
	}
}

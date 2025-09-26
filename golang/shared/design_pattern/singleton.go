package designpattern

import "sync"

// DatabaseSingleton embeds the generic singleton for DatabaseConnection
// type DatabaseSingleton struct {
// 	*Singleton[*DatabaseConnection]
// }

// SingletonInterface defines the contract for singleton implementations
type SingletonInterface[T any] interface {
	GetInstance() T
}

// Singleton is a generic singleton base struct that can be embedded
type Singleton[T any] struct {
	once     sync.Once
	instance T
	factory  func() T
}

// NewSingleton creates a new singleton with the provided factory function
func NewSingleton[T any](factory func() T) *Singleton[T] {
	return &Singleton[T]{
		factory: factory,
	}
}

// GetInstance returns the singleton instance, creating it if necessary
func (s *Singleton[T]) GetInstance() T {
	s.once.Do(func() {
		s.instance = s.factory()
	})
	return s.instance
}

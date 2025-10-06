package designpattern

// Abstract factory interface for creating new instances
type Factory[T any] interface {
	Create() T
}

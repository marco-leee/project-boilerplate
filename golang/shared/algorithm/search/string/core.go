package string

import (
	"fmt"
	"golang-boilerplate/shared/algorithm"
)

func NewStringFactory(name string) (algorithm.IStrategy[string], error) {
	switch name {
	case "linear":
		return &LinearSearch{}, nil
	case "binary":
		return &BinarySearch{}, nil
	}
	return nil, fmt.Errorf("invalid search name: %s", name)
}

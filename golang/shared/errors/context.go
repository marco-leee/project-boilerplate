package errors

import (
	"errors"
)

type ContextError error

var (
	ErrContextTimeout  ContextError = errors.New("context timeout")
	ErrContextCanceled ContextError = errors.New("context canceled")
)

func IsContextTimeout(e error) bool {
	return errors.Is(e, ErrContextTimeout)
}

func IsContextCanceled(e error) bool {
	return errors.Is(e, ErrContextCanceled)
}

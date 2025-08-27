package env

type Environment string

const (
	Docker      Environment = "docker"
	Development Environment = "development"
	Testing     Environment = "testing"
	Staging     Environment = "staging"
	Production  Environment = "production"
)

func (e Environment) IsDocker() bool {
	return e == Docker
}

func (e Environment) IsDevelopment() bool {
	return e == Development
}

func (e Environment) IsTesting() bool {
	return e == Testing
}

func (e Environment) IsStaging() bool {
	return e == Staging
}

func (e Environment) IsProduction() bool {
	return e == Production
}

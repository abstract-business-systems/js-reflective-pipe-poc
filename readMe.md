# JS Reflective Pipe

	A POC on reflective pipes, a mechanism to help with writing flows that are reflective (data passes till the last flow and bounces back till the first) and controllable.

## Notes

* Pipes generally return objects or undefined.

* These return values are passed on to the next pipes.

* When a pipe doesn't return any value the latest return value would be the substitute.

* Inputs to the pipes are always an object.

* This object contains a function named next, which could be used to retrieve the return values of the downstream pipes. Additional data could be passed to the pipes.

* Pipes cannot remove keys from the passed context. They could modify the return value.

* The final value would be the combination of the output of the pipes.

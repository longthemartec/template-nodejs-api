# Debug
>`DebugModule` registers a decorator that outputs logs along with the execution time in all methods of the `controllers` and `providers` of the module (including import module) to which the `@Debug` decorator is applied. \
Instead of adding a log to every method one by one, you can leave a log of execution of all methods with one decorator. \
It can also be applied only to specific classes or methods.

## Usage
- See the Sample at path `./sample` folder for examples.

### Module
```ts
@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [...],
  providers: [...],
})
export class AppModule {}
```
- To exclude a specific class within a module
```ts
@Debug({ context: 'ModuleContext', exclude: [AppService] })
```

### Class
> You don't need to import `DebugModule` and `@Debug` when using it in class. It works as a separate decorator. \
Registering `@DebugLog` in a class applies to all methods in the class, so there is no need to register `@DebugLog` in a method.
```ts
@Controller()
@DebugLog('ClassContext')
export class AppController {
  @Get()
  @DebugLog('MethodContext')
  public method() {}
}
```

## Logging
- See Logger at path `./debug-log.decorator.ts` to edit log format.
- Example of log output of Step at path `./sample/sample.controller.ts` method ![Step](https://user-images.githubusercontent.com/1300172/148489601-91c5e3be-4122-464d-abfd-997fe9721c0b.png)
- Example of log output of Chain `./sample/sample.controller.ts` method ![Chain](https://user-images.githubusercontent.com/1300172/148489682-99996cc9-7d9b-4c9e-a74e-1af4eaa184a5.png)

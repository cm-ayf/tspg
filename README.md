# tspg

Short URL Generator for TypeScript Playground. The code is stored in [GitHub Gist](https://gist.github.com/).

## Usage

### Web App ([tspg.vercel.app](https://tspg.vercel.app))

Access and paste the URL.

### API

`POST /` an `application/json` with `url` field. You will get an `application/json` response with `id` and `url` field.

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"https://www.typescriptlang.org/play?target=99&jsx=0#code/IYZwngdgxgBAZgV2gFwJYHsIygJwKbDJ4DKAFujsgKo4A2AFAnQFwwjI6oQDmAlDAG8AUDFHZM7GPhAAHCXhgBeGMADuwVMnh5kUUvQBEpZMhkhmAegvJZ3AHQA3PDih5ad4DJkWDAGkEiYkGkBAAmzuaCMAYAwphEEMgAtAAqYDJ4BqwGnjK0qFCEGBAWAFYgmAYwAL6+gUGiAEbooWCsAFLEAPIAcnbsnDyocGD0AjBMtDW8dUHVvADc9eIQkuWYSirqmlJ4svJ26xD0i8v4yExYR3aTS9VCQA"}' https://tspg.vercel.app/
{"id":"577fa93186ab04d7c38e8e60fca9906e","url":"https://tspg.vercel.app/577fa93186ab04d7c38e8e60fca9906e"}
```

# License

[MIT License](LICENSE)

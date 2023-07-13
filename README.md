# tspg

Short URL Generator for TypeScript Playground. The code is stored in [GitHub Gist](https://gist.github.com/).

## Usage

### Web App ([tspg.vercel.app](https://tspg.vercel.app))

Access and paste the URL.

### API

`POST /` an `application/json` with `url` field. You will get an `application/json` response with `id` and `url` field.

```sh
$ curl -X POST -H "Content-Type: application/json" -d '{"url":"https://www.typescriptlang.org/play?target=99&jsx=0#code/IYZwngdgxgBAZgV2gFwJYHsIygJwKbDJ4DKAFujsgKo4A2AFAnQFwwjI6oQDmAlDAG8AUDFHZM7GPhAAHCXhgBeGMADuwVMnh5kUUvQBEpZMhkhmAegvJZ3AHQA3PDih5ad4DJkWDAGkEiYkEAtjrkACasBgAKAPLEACp+gUGipAThzuaCMAYAwphEEMgAtAlgMngGUZ4ytKhQhBgQFgBWIJgGMAC+vimpAEbo4WCsAFLEsQByduycPKhwYPQCMEy0Pbx9Qd28ANz9UBJa7ZhKKuqaUniy8nanEPT7-fjITFgPdusH3UJAA"}' https://tspg.vercel.app/
{"id":"c36e0a7aa3f72c7b0d9a3f871cefb1c7","url":"https://tspg.vercel.app/c36e0a7aa3f72c7b0d9a3f871cefb1c7"}
```

# License

[MIT License](LICENSE)

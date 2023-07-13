# tspg

Short URL Generator for TypeScript Playground. The code is stored in [GitHub Gist](https://gist.github.com/).

## Usage

### Web App ([tspg.cc](https://tspg.cc))

Access and paste the URL.

### API

`POST /` an `application/json` with `url` field. You will get an `application/json` response with `id` and `url` field.

```sh
$ curl -X POST https://tspg.cc/ -H "Content-Type: application/json" -d '{"url": "https://www.typescriptlang.org/play?target=99&jsx=0#code/IYZwngdgxgBAZgV2gFwJYHsIygJwKbDJ4DKAFujsgKo4A2AFAnQFwwjI6oQDmAlDAG8AUDFHZM7GPhAAHCXhgBeGMADuwVMnh5kUUvQBEpZMhkhmAegvJZ3AHRQoFgwBpBIsZ4C2O8gBNWAwAFAHliABVXD09RUgI-PBxzQRgDAGFMIghkAFpwsBk8A0DgGRlaVChCDAgLACsQTAMYAF8XaJiAI3Q-MFYAKWIQgDk7dk4eVDgwegEYJlpW3nbPFt4Abg6oCS0GzCUVdU0pPFl5Oz2Ieg2O-GQmLEu7Bc2WoSA"}'
{"id":"eef0f421f61b2d47c79b408584a16627","url":"https://tspg.cc/eef0f421f61b2d47c79b408584a16627"}
```

# License

[MIT License](LICENSE)

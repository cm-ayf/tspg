# tspg

Short URL Generator for TypeScript Playground. The code is stored in [GitHub Gist](https://gist.github.com/).

## Usage

### Web App ([tspg.cc](https://tspg.cc))

Access and paste the URL.

### API

`POST /create` an `application/json` with `url` field. You will get an `application/json` response with `id` and `url` field.

```sh
$ curl -X POST https://tspg.cc/create -H "Content-Type: application/json" -d '{"url": "https://www.typescriptlang.org/play?#code/IYZwngdgxgBAZgV2gFwJYHsIygJwKbDJ4DKAFujsgKo4A2AFAnQFwwjI6oQDmAlDAG8AUDFHZM7GPhAAHCXhgBeGMADuwVMnh5kUUvQBEpZMhkhmAegvJZ3AHRQoF3ASIGANIJFifAWx3kACasBgAKAPLEACoe3j6ipASBeDjmgjAGAMKYRBDIALRRYDJ4BiHAMjK0qFCEGBAWAFYgmAYwAL7ucfEARuiBYKwAUsThAHJ27Jw8qHBg9AIwTLQdvF0+7bwA3N1QElrNmEoq6ppSeLLydocQ9Nvd+MhMWDd2yzvtQkA"}'
{"id":"733739c14f5558769b3d7f00fe87ae3f","url":"https://tspg.cc/733739c14f5558769b3d7f00fe87ae3f"}
```

# License

[MIT License](LICENSE)

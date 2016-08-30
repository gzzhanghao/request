export default class Request {

  constructor(req) {
    this.raw = this.body = req
    this.host = this.raw.headers.host
  }

  set method(method) {
    this.raw.method = method
  }

  get method() {
    return this.raw.method
  }

  set protocol(protocol) {
    this.raw.protocol = protocol
  }

  get protocol() {
    return this.raw.protocol
  }

  set hostname(hostname) {
    this.host = `${hostname}:${this.port}`
  }

  get hostname() {
    return this.host.split(':')[0]
  }

  set port(port) {
    if (!port) {
      this.host = this.hostname
    } else {
      this.host = `${this.hostname}:${port}`
    }
  }

  get port() {
    return this.host.split(':')[1]
  }

  get url() {
    return url.parse(this.raw.url, true, true)
  }

  set path(path) {
    this.raw.url = path
  }

  get path() {
    return this.url.path
  }

  set pathname(pathname) {
    this.raw.url = url.format(Object.assign(this.url, { pathname }))
  }

  get pathname() {
    return this.url.pathname
  }

  set search(search) {
    this.raw.url = url.format(Object.assign(this.url, { search }))
  }

  get search() {
    return this.url.search
  }

  set query(query) {
    this.raw.url = url.format(Object.assign(this.url, { search: undefined, query }))
  }

  get query() {
    return this.url.query
  }

  set hash(hash) {
    this.raw.url = url.format(Object.assign(this.url, { hash }))
  }

  get hash() {
    return this.url.hash
  }

  set href(href) {
    const com = url.parse(href)
    if (com.protocol) {
      this.protocol = com.protocol
    }
    if (com.host) {
      this.host = com.host
    }
    if (com.path) {
      this.path = com.path
    }
    if (com.hash) {
      this.hash = com.hash
    }
  }

  get href() {
    return url.format(this)
  }

  set headers(headers) {
    this.raw.headers = headers
  }

  get headers() {
    return this.raw.headers
  }

  set auth(auth) {
    this.raw.auth = auth
  }

  get auth() {
    return this.raw.auth
  }

  setQuery(query) {
    this.query = Object.assign(this.query, query)
    return this
  }

  unsetQuery(key) {
    const query = this.query
    delete query[key]
    this.query = query
    return this
  }
}

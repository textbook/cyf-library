export default class ResourceService {

  getResources () {
    return fetch("/api/resources").then((res) => res.json());
  }

  getResourcesByCategory (category) {
    return fetch(`/api/resources?category=${category}`).then((res) => res.json());
  }
}

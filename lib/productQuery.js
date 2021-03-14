export default {
	query: `query {
    products {
      name
      id
      image
      slug
      price
      categories {
        name
      }
    }
  }`,
};

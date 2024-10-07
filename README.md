## Good Goods


### Background
Social enterprises are businesses set up with clear social goals. They support various causes that benefit the community and the environment, being an avenue through which everyday consumers can contribute to meaningful social causes. 💗

Through a survey with 94 Singaporeans, we found out that 85% of them are willing to consume more from F&B and retail social enterprises. However, 95% felt that it was hard to find social enterprises near them, and 80% experienced difficulty in locating social enterprises that offer the products they want.

### Problem Statement
Singaporeans recognise the importance of social enterprises and are willing to support social enterprises, but finding these businesses remains a significant challenge.


### Solution
Meet Good Goods, an online platform that effortlessly connects consumers with social enterprises in Singapore. 😄🛒

#### Features
1. Search bar to discover social enterprises that meet your product needs.
2. Filter enterprises by format, region, and product type.
3. View detailed information about social enterprises.
4. Recommend social enterprises to be featured on Good Goods.


#### Implementation
##### Front-end
The front-end is built using Next.JS, with a mix of server-side and client-side components. TailwindCSS was used as the CSS framework, and Flowbite was used as the component library.

##### Back-end
MongoDB was used as both a data store and a vector store. The front-end retrieves data of social enterprises by making API calls to the MongoDB database.


##### Retrieval Augmented Generation (RAG)
RAG was used for the search bar. This allows us to perform semantic search, so consumers can search using a natural language query and we can retrieve relevant results. For example, if the consumer searches for 'latte', related results like cafes would appear, despite their data not containing the actual word 'latte'.

The high level idea of our implementation is as follows:
1. The data for each social enterprise is embedded into a vector using OpenAI's embedding model. The vector is stored in MongoDB.
2. When the user enters a query in the search bar, the query is embedded into a vector using OpenAI's embedding model.
3. A vector search is done through MongoDB by implementing an index on the field that contains the embeddings of the social enterprises.
4. Using the Approximate Nearest Neighbour (ANN) algorithm available in MongoDB's vector search, the 10 most similar social enterprises will be retrieved.
5. The retrieved data will be fed as context into an OpenAI model. A prompt is then engineered to ask the model to return the relevant social enterprises that satisfy the user's query.

##### Deployment
Good Goods is deployed using Vercel.

### Additional Information
Good Goods was created during Open Government Products' Build for Good hackathon in 2024. Currently, only 20 social enterprises are featured on Good Goods.
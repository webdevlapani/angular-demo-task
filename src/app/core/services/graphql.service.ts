import { Injectable } from '@angular/core';
import {
  ApolloClient,
  ApolloQueryResult,
  InMemoryCache,
} from '@apollo/client/core';
import { gql } from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  private client: ApolloClient<any>;
  constructor() {
    this.client = new ApolloClient({
      uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
      cache: new InMemoryCache(),
    });
  }

  getAllPeople(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allPeople {
            people {
              birthYear
              gender
              id
              name
              skinColor
            }
          }
        }
      `,
    });
  }

  getAllFilms(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allFilms {
            films {
              director
              releaseDate
              producers
              title
            }
          }
        }
      `,
    });
  }

  getAllPlanets(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allPlanets {
            planets {
              gravity
              id
              name
              population
            }
          }
        }
      `,
    });
  }

  getAllSpecies(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allSpecies {
            species {
              averageHeight
              averageLifespan
              classification
              designation
              eyeColors
              id
              language
              name
            }
          }
        }
      `,
    });
  }

  getAllStarships(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allStarships {
            starships {
              cargoCapacity
              consumables
              costInCredits
              crew
              length
              manufacturers
            }
          }
        }
      `,
    });
  }

  getAllVehicles(): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
        query {
          allVehicles {
            vehicles {
              consumables
              cargoCapacity
              costInCredits
              crew
              id
              length
              manufacturers
              maxAtmospheringSpeed
            }
          }
        }
      `,
    });
  }

  getFields(typeName: string): Promise<ApolloQueryResult<any>> {
    return this.client.query({
      query: gql`
      query IntrospectionQuery {
        __type(name: "${typeName}") {
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
      `,
    });
  }
}

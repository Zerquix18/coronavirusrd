import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const casesQuery = useStaticQuery(graphql`
    query allDataQuery {
      allCasesJson {
        nodes {
          cases {
            date
            total_cases
            total_deaths
            new_cases
            new_deaths
          }
        }
      }
      allSexJson {
        nodes {
          sex {
            date
            men
            women
          }
        }
      }
      allProvincesJson {
        nodes {
          provinces {
            name
            cases {
              date
              total_imported
              total_under_investigation
              total_local
              total_deaths
              total_cases
            }
          }
        }
      }
    }
  `)

  const allCases = casesQuery.allCasesJson.nodes[0].cases
  const sexData = casesQuery.allSexJson.nodes[0].sex
  const allProvinces = casesQuery.allProvincesJson.nodes[0].provinces

  console.log(allCases, sexData, allProvinces)

  return (
    <Layout>
      <SEO title="Inicio" />
      Hola, yo soy el contenido principal. :D
    </Layout>
  )
}

export default IndexPage

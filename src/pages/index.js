import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import MainInfo from '../components/main-info'
import CaseCharts from '../components/case-charts'
import ProvinceDistribution from '../components/province-distribution'
import SexChart from '../components/sex-chart'
import NewByDay from '../components/new-by-day'
import GrowthFactor from "../components/growth-factor"
import Updates from '../components/updates'
import CaseLocation from '../components/case-location'
import Tests from "../components/tests"

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
            total_recovered
            total_discarded
            total_at_the_hospital
            total_at_home
            total_under_investigation
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
              total_deaths
              total_cases
              positivity
              total_recovered
            }
          }
        }
      }

      allUpdatesJson {
        nodes {
          updates {
            title
            link
            date
          }
        }
      }
    }
  `)

  const allCases = casesQuery.allCasesJson.nodes[0].cases
  const sexData = casesQuery.allSexJson.nodes[0].sex
  const allProvinces = casesQuery.allProvincesJson.nodes[0].provinces
  const updates = casesQuery.allUpdatesJson.nodes[0].updates

  return (
    <Layout>
      <SEO title="Inicio" />
      <strong>Última actualización: </strong>16 de Mayo, 11:59AM

      <hr />

      <MainInfo cases={allCases} />

      <hr />

      <CaseCharts cases={allCases} />

      <hr />

      <ProvinceDistribution provinces={allProvinces} />

      <hr />

      <Tests cases={allCases} />

      <hr />

      <CaseLocation cases={allCases} />

      <hr />

      <SexChart sexData={sexData} />

      <hr />

      <NewByDay cases={allCases} />

      <hr />

      <GrowthFactor cases={allCases} />

      <hr />

      <Updates updates={updates} />

    </Layout>
  )
}

export default IndexPage

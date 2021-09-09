import React from "react"
import { graphql } from "gatsby"

// import Bio from "../components/bio"
// import Layout from "../components/layout"
// import SEO from "../components/seo"
// import { rhythm } from "../utils/typography"

import LinkedIn from "../../content/assets/linkedin.png"

const BlogIndex = () => {
  // const siteTitle = data.site.siteMetadata.title
  // const posts = data.allMarkdownRemark.edges

  // return (
  //   <Layout location={location} title={siteTitle}>
  //     <SEO title="All posts" />
  //     <Bio />
  //     {posts.map(({ node }) => {
  //       const title = node.frontmatter.title || node.fields.slug
  //       return (
  //         <article key={node.fields.slug}>
  //           <header>
  //             <h3
  //               style={{
  //                 marginBottom: rhythm(1 / 4),
  //               }}
  //             >
  //               <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
  //                 {title}
  //               </Link>
  //             </h3>
  //             <small>{node.frontmatter.date}</small>
  //           </header>
  //           <section>
  //             <p
  //               dangerouslySetInnerHTML={{
  //                 __html: node.frontmatter.description || node.excerpt,
  //               }}
  //             />
  //           </section>
  //         </article>
  //       )
  //     })}
  //   </Layout>
  // )

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center" }}>Under Construction</h1>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <a
            rel="noreferrer"
            target="_blank"
            style={{ boxShadow: "none", textDecoration: "none" }}
            href="https://www.linkedin.com/in/michal-dedys-5270a356/"
          >
            <img
              alt="LinkedIn Michal Dedys"
              src={LinkedIn}
              style={{ width: 26.43, height: 22.18, margin: 0 }}
            />
          </a>
        </div>
      </div>
    </div>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`

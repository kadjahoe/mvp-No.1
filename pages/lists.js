import { Component } from 'react'
// import fetch from 'isomorphic-unfetch'
import client from '../services/graphql-client'
import Markdown from 'react-markdown'
import Link from 'next/link'

export default class EmailLists extends Component {
    constructor(props) {
        super(props)
        this.state = { data: props.data }
    }
    static async getLists() {
        const data = await client.request(`
        {
            allEmailLists {
              address
              name
              description
              access_level
              members {
                address
              }
            }
        }
        `)
        return data.allEmailLists
    }
    static async getInitialProps() {
        const data = await EmailLists.getLists()
        return { data }
    }
    render() {
        return (
            <div>
                <style jsx>{`
                table, th, td {
                    border: 1px solid black;
                    padding: 4px;
                }
                `}</style>
                <h1>Lists that exists already</h1>
                <table>
                    <thead>
                        <tr>
                            <th>address</th>
                            <th>name</th>
                            <th>description</th>
                            <th>access_level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((list, i) => (
                            <tr key={i}>
                                <td>{list.address}</td>
                                <td>{list.name}</td>
                                <td>{list.description}</td>
                                <td>{list.access_level}</td>
                                <td><Link href={`/email/lists/${list.address}/members`}><a>members</a></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
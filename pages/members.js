import { Component } from 'react'

export default class EmailMembers extends Component {
    constructor(props) {
        super(props)
    }
    // static async getMembers(address) {
    //     fetch(`http://localhost:3000/email/data/lists/${address}/members`, {});
    // }
    // static async getInitialProps({ pathname, query }) {
    //     console.log('pathname', pathname)
    //     console.log('query', query)
    //     const data = await EmailMembers.getMembers(query.address)
    //     return { data: data.items }
    // }
    render() {
        return (<div>hello world</div>)
    }
    // render() {
    //     return (
    //         <div>
    //             <style jsx>{`
    //             table, th, td {
    //                 border: 1px solid black;
    //                 padding: 4px;
    //             }
    //             `}</style>
    //             <h1>Lists that exists already</h1>
    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>address</th>
    //                         <th>name</th>
    //                         <th>description</th>
    //                         <th>access_level</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.state.data.map((list, i) => (
    //                         <tr key={i}>
    //                             <td>{list.address}</td>
    //                             <td>{list.name}</td>
    //                             <td>{list.description}</td>
    //                             <td>{list.access_level}</td>
    //                             <td><Link href={`/email/lists/${list.address}/members`}><a>members</a></Link></td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         </div>
    //     )
    // }
}
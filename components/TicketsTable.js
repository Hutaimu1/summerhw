import React , { Component } from "react"

export default class TicketsTable extends Component {
    constructor(props) {
        super(props);
        this.makeTicketsList = this.makeTicketsList.bind(this);
        this.ticketsCheckFlagChange = this.ticketsCheckFlagChange.bind(this);
        this.deleteTickets = this.deleteTickets.bind(this);
        this.countInput = this.countInput.bind(this);
        this.minusClick = this.minusClick.bind(this);
        this.plusClick = this.plusClick.bind(this);
    }

    ticketsCheckFlagChange(event) {
        this.props.changeTicketsCheckFlag(event.currentTarget.getAttribute("data-goodsId"));
    }

    deleteTickets(event) {
        this.props.deleteTickets(event.currentTarget.getAttribute("data-goodsId"));
    }

    countInput(event) {
        let temp = event.currentTarget.value;
        temp = temp.replace(/[^0-9]/g , "");
        if("" !== temp) {
            temp = parseInt(temp , 10);
        }
        else {
            temp = 0;
        }
        this.props.setTicketsCount(event.currentTarget.getAttribute("data-goodsId") , temp);
        event.currentTarget.value = temp;
    }

    plusClick(event) {
        let countInput = event.currentTarget.previousSibling;
        let temp = parseInt(countInput.value , 10);
        this.props.setTicketsCount(countInput.getAttribute("data-goodsId") , ++temp);
        countInput.value = temp;
    }

    minusClick(event) {
        let countInput = event.currentTarget.nextSibling;
        let temp = parseInt(countInput.value , 10);
        if(0 !== temp) {
            this.props.setTicketsCount(countInput.getAttribute("data-goodsId") , --temp);
        }
        countInput.value = temp;
    }

    makeTicketsList() {
        let ticketsList = [];
        this.props.ticketsList.forEach(tickets =>{
            ticketsList.push(
                <tr key = {tickets.id}>
                    <td>
                        <input type = "checkbox" data-goodsId = {tickets.id} checked = {tickets.cked} onChange = {this.ticketsCheckFlagChange} />
                    </td>
                    <td className = "col-xs-1">
                        <img src = {tickets.src} className = "img-responsive" alt = "你等着吧..." />
                    </td>
                    <td>{tickets.ticketName}</td>
                    <td>{tickets.price}</td>
                    <td style = {{position : "relative" , width : "10%"}}>
                        <div style = {{position : "relative" , width : "30%" , left : "35%"}}>
                            <button style = {{position : "absolute" , width : "80%" , left : "-80%"}} onClick = {this.minusClick}>
                                <i className = "fa fa-minus"></i>
                            </button>
                            <input data-goodsid = {tickets.id} style = {{position : "relative" , width : "100%" , textAlign : "center"}} defaultValue = {tickets.amount} onInput = {this.countInput} />
                            <button style = {{position : "absolute" , width : "80%" , right : "-80%" , top : "0px"}} onClick = {this.plusClick}>
                                <i className = "fa fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>{parseInt(tickets.amount , 10) * tickets.price}</td>
                    <td><button className = "btn btn-danger btn-xs" data-goodsid = {tickets.id} onClick = {this.deleteTickets}><i className = "fa fa-times"></i></button>
                    </td>
                </tr>
            );
        });
        return ticketsList;
    }

    render() {
        return (
            <table id = "TicketsTable" className = "table table-hover">
                <thead>
                {this.props.thead}
                </thead>
                <tbody>
                {this.makeTicketsList}
                </tbody>
            </table>
        );
    }
}
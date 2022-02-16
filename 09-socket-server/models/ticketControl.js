const path = require("path");
const fs = require("fs");

const Ticket = require("./ticket");

class TicketControl {
  constructor() {
    this.lastNumber = 0;
    this.today = new Date().getDate();
    this.pendingTickets = [];
    this.last4Tickets = [];

    //Initial methods
    this.init();
  }

  toJson() {
    return {
      lastNumber: this.lastNumber,
      today: this.today,
      pendingTickets: this.pendingTickets,
      last4Tickets: this.last4Tickets,
    };
  }

  init() {
    //Read a json like a boss
    const {
      lastNumber,
      today,
      pendingTickets,
      last4Tickets,
    } = require("../db/data.json");

    if (today == this.today) {
      this.pendingTickets = pendingTickets;
      this.lastNumber = lastNumber;
      this.last4Tickets = last4Tickets;
    } else {
      //It's another day
      this.saveDB();
    }
  }

  saveDB() {
    const dbPath = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(dbPath, JSON.stringify(this.toJson()));
  }

  next() {
    this.lastNumber += 1;
    this.pendingTickets.push(new Ticket(this.lastNumber, null));
    this.saveDB();
    return `Ticket ${this.lastNumber}`;
  }

  attendTicket(desk) {
    if (this.pendingTickets.length == 0) return null;

    //Revome first ticket from line
    const ticket = this.pendingTickets.shift();

    //Asign desk
    ticket.desk = desk;

    this.last4Tickets.unshift(ticket);

    //Only keep the last 4 aattented tickets
    if (this.last4Tickets.length > 4) this.last4Tickets.splice(-1, 1);

    this.saveDB();

    return ticket;
  }

  resetCount() {
    this.lastNumber = 0;
    this.pendingTickets = [];
    this, (this.last4Tickets = []);
    this.today = new Date().getDate();
    this.saveDB();
  }
}

module.exports = TicketControl;

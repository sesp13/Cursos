const path = require("path");
const fs = require("fs");

const Ticket = require("./ticket");

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.last4 = [];

    //Initial methods
    this.init();
  }

  toJson() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      last4: this.last4,
    };
  }

  init() {
    //Read a json like a boss
    const { last, today, tickets, last4 } = require("../db/data.json");

    if (today == this.today) {
      this.tickets = tickets;
      this.last = last;
      this.last4 = last4;
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
    this.last += 1;
    this.tickets.push(new Ticket(this.last, null));
    this.saveDB();
    return `Ticket + ${this.last}`;
  }

  attendTicket(desk) {
    if (this.tickets.length == 0) return null;

    //Revome first ticket from line
    const ticket = this.tickets.shift();

    //Asign desk
    ticket.desk = desk;

    this.last4.unshift(ticket);

    if (this.last4 > 4) {
      this.last4.splice(-1, 1);
    }

    this.saveDB();

    return ticket;
  }
}

module.exports = TicketControl;

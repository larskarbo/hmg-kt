import React, { Component } from "react";
import axios from 'axios'

export default class App extends Component {

    constructor() {
        super()

        const felt = window.pameld.felt.map(f => {
            return {
                name: f.split('§§')[0],
                desc: f.split('§§')[1],
                price: parseInt(f.split('§§')[2]),
                amout: 0
            }
        })



        this.state = {
            felt,
            antall: 1,
            pris: window.pameld.pris,
            info: window.pameld.forklaring,
            extra: '',
            ferdigtekst: false
        }

        //crazy hack
        window.aself = this
    }

    submit() {


        const description =
            `Påmelding til ${window.arrtitle}`
            + `\nDato: ${window.arrdate}`

            + `\nAntall personer: ${this.state.antall} * ${this.state.pris} kr = ${this.peoplePrice} kr`

            + `\n${this.state.felt
                .filter(f => f.amout > 0)
                .map(f => (
                    `\n${f.amout} stk ${f.name} = ${f.amout} * ${f.price} kr = ${f.price * f.amout} kr`
                    + `\n${f.desc}`
                ))
                .join('')
                .trim()
            }`

            + `\nTil sammen: ${this.peoplePrice} kr + ${this.rentPrice} kr = ${this.totalPrice} kr`

            + `\n${this.state.info} ${this.state.extra}`


            + `\n\nNavn: ${this.namei.value}`
            + `\nEpost: ${this.emaili.value}`

            + `\nTlf: ${this.tlfi.value}`

            + `\nEkstra kommentar: ${this.kommentari.value}`

        const obj = {
            // fakturadetails
            name: this.namei.value,
            description: description,
            title: `Påmelding til ${window.arrtitle}`,
            tripDate: window.arrdate,
            amount: this.totalPrice,

            arrstr: window.arrstr,
            epost: this.emaili.value,
            tlf: this.tlfi.value,
            antall: this.state.antall,
        }


        axios.post('/turar/arrangement/pamelding/' + window.arrstr, obj)
            .then((response) => {
                console.log('response: ', response);
                console.log('link')

                window.aself.setState({
                    ferdigtekst: 'Vi har mottatt din bestilling. Bekreftelse er sendt til epost ' + response.data.epost,
                    link: response.data.link
                })
            })
            .catch(function (error) {

            });


    }

    render() {
        console.log('render')
        const peoplePrice = this.state.pris * this.state.antall



        const rentPrice = this.state.felt.reduce((acc, cur) => {
            return acc + cur.price * cur.amout
        }, 0)

        this.totalPrice = peoplePrice + rentPrice
        this.peoplePrice = peoplePrice
        this.rentPrice = rentPrice

        // if (this.namei) {
        //     this.submit()
        // }
        if (this.state.ferdigtekst) {
            return (<div className="yo">
                <p>{this.state.ferdigtekst}</p>

                <p>Vennligst betal denne fakturaen snarest: <a href={this.state.link}>{this.state.link}</a></p>
            </div>)
        }

        return (
            <div className="yo">

                {/* lall */}

                <div className="joda">
                    Pris per person: <strong>{this.state.pris} kr</strong>
                </div>
                <a onClick={() => {
                    this.setState({
                        vis: !this.state.vis
                    })
                }}>+ Vis påmeldingsinfo</a>

                {this.state.vis &&
                    <div>

                        <div className="joda">
                            Antall personar:<span class="width"> </span>
                            <select value={this.state.antall} onChange={(e) => {
                                this.setState({
                                    antall: e.target.value
                                })
                            }}>
                                {Array.from(Array(window.ledigeplassar + 1).keys()).map(je => (
                                    <option value={je}>{je}</option>
                                ))}
                            </select>
                        </div>
                        {this.state.antall > 0 &&
                            <div>
                                {this.state.felt.map((f, i) => {
                                    return (
                                        <div className="felt joda">
                                            <div>
                                                <p className="name">{f.name}</p>
                                                <p className="desc">{f.desc}</p>
                                            </div>
                                            <div>
                                                <strong>{f.price} kr</strong> <span class="width"> </span>
                                                <select value={f.amout} onChange={(e) => {
                                                    this.setState({
                                                        felt: this.state.felt.map((v, ii) => {
                                                            if (i == ii) {
                                                                return {
                                                                    ...v,
                                                                    amout: e.target.value
                                                                }
                                                            }
                                                            return v
                                                        })
                                                    })
                                                }}>
                                                    {Array.from(Array(window.ledigeplassar + 1).keys()).map(je => (
                                                        <option value={je}>{je}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className="joda">
                                    Pris: {peoplePrice} kr + {rentPrice} kr = <strong>{peoplePrice + rentPrice} kr</strong>
                                </div>
                                <div className="joda hei">
                                    <p>{this.state.info}</p>
                                    <textarea placeholder="" value={this.state.extra} onChange={(e) => {
                                        this.setState({
                                            extra: e.target.value
                                        })
                                    }} />
                                </div>

                                <form class="lars-mini" id="vinogdram" onSubmit={(e) => {
                                    this.submit()

                                    e.preventDefault()

                                }}>
                                    <div class="form-group">
                                        <label for="namn">Navn: </label>
                                        <input ref={i => { this.namei = i }} type="text" id="name" name="namn" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="epost">E-post: </label>
                                        <input ref={i => { this.emaili = i }} type="email" id="email" name="epost" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="telefon">Tlf: </label>
                                        <input ref={i => { this.tlfi = i }} type="tel" id="telefon" name="telefon" required />
                                    </div>
                                    <div class="form-group">
                                        <label class="block" for="melding">Ekstra kommentar: </label>
                                        <textarea ref={i => { this.kommentari = i }} id="message" rows="8" placeholder="" name="melding"></textarea>
                                    </div>
                                    <div class="message"></div>
                                    <button type="submit" class="btn btn-success" id="sendmail">Bestill og gå til betaling</button>
                                </form>


                            </div>
                        }

                    </div>
                }
            </div>
        )
    }
}
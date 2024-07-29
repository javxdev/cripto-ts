import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { useState } from "react"
import { Pair } from "../types"
import ErrroMessage from "./ErrroMessage"

export default function CriptoSearchForm() {
    const { cryptocurrencies, fetchData } = useCryptoStore()
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptocurrency: ''
    })
    const [error, setError] = useState('')
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(pair).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }
        setError('')
        fetchData(pair)

        setPair({
            currency: '',
            criptocurrency: ''
        })
    }
 
    return (
        <form
            className="form"
            onSubmit={handleSubmit}
        >
            {error && <ErrroMessage>{error}</ErrroMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda: </label>
                <select 
                    name="currency" 
                    id="currency"
                    value={pair.currency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map( currency => (
                        <option value={currency.code} key={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="criptocurrency">Criptomoneda: </label>
                <select 
                    name="criptocurrency" 
                    id="criptocurrency"
                    value={pair.criptocurrency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {cryptocurrencies.map( crypto => (
                        <option 
                            key={crypto.CoinInfo.FullName} 
                            value={crypto.CoinInfo.Name}
                        >{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <input type="submit" value='Cotizar'/>
        </form>
    )
}

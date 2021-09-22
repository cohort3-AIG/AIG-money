// import "./style.css"
export default function CreditCard() {
    return (
        <div>
            <div className="body">
                <div className="card">
                    <form>
                        <h1 className="card__title">Enter Payment Information</h1>
                        <div className="card__row">
                            <div className="card__col">
                                <label htmlFor="cardNumber" className="card__label">Card Number</label
                                ><input
                                    type="text"
                                    className="card__input card__input--large"
                                    id="cardNumber"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                />
                            </div>
                            <div className="card__col card__chip">
                                <img src="/images/chip.svg" alt="chip" />
                            </div>
                        </div>
                        <div className="card__row">
                            <div className="card__col">
                                <label htmlFor="cardExpiry" className="card__label">Expiry Date</label
                                ><input
                                    type="text"
                                    className="card__input"
                                    id="cardExpiry"
                                    placeholder="xx/xx"
                                />
                            </div>
                            <div className="card__col">
                                <label htmlFor="cardCcv" className="card__label">CCV</label
                                ><input
                                    type="text"
                                    className="card__input"
                                    id="cardCcv"
                                    placeholder="xxx"
                                />
                            </div>
                            <div className="card__col card__brand"><i id="cardBrand"></i></div>
                        </div>
                    </form>
                </div>
            </div>
            Use Default Address Information
        </div>
    )
}

import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
    const [loanAmount, setLoanAmount] = useState(200000);
    const [fixedRate, setFixedRate] = useState(3.5);
    const [variableRate, setVariableRate] = useState(2.5);
    const [loanTerm, setLoanTerm] = useState(25);
    const [fixedPercentage, setFixedPercentage] = useState(75);

    const fixedPortion = loanAmount * (fixedPercentage / 100);
    const variablePortion = loanAmount * ((100 - fixedPercentage) / 100);

    const fixedMonthlyRepayment = () => {
        const r = fixedRate / 100 / 12;
        const n = loanTerm * 12;
        return ((fixedPortion * r) / (1 - Math.pow(1 + r, -n))).toFixed(2);
    }

    const variableWeeklyRepayment = () => {
        const r = variableRate / 100 / 52;
        const n = loanTerm * 52;
        return ((variablePortion * r) / (1 - Math.pow(1 + r, -n))).toFixed(2);
    }
    const variableFortnightlyRepayment = () => {
        const r = variableRate / 100 / 26;
        const n = loanTerm * 26;
        return ((variablePortion * r) / (1 - Math.pow(1 + r, -n))).toFixed(2);
    }

    const totalInterest = () => {
        let totalInterest = 0;
        let fixedInterest = 0;
        let variableInterest = 0;
        const a = fixedMonthlyRepayment();
        const b = variableWeeklyRepayment();
        fixedInterest = a * loanTerm * 12;
        variableInterest = b * loanTerm * 52;
        totalInterest = fixedInterest + variableInterest - loanAmount;
        return totalInterest;
    }

    return (
        <div>
            <h2>Split Mortgage Calculator</h2>
            <div className="home">
                <div>
                    <h4>Enter values</h4>
                    <label>Loan Amount: </label>
                    <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} /><br /><br />

                    <label>Fixed Rate : </label>
                    <input type="number" value={fixedRate} onChange={(e) => setFixedRate(e.target.value)} /><br /><br />

                    <label>Variable Rate: </label>
                    <input type="number" value={variableRate} onChange={(e) => setVariableRate(e.target.value)} /><br /><br />

                    <label>Loan Term(years): </label>
                    <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} /><br /><br />

                    <label>Fixed Percentage: </label>
                    <input type="number" value={fixedPercentage} onChange={(e) => setFixedPercentage(e.target.value)} /><br /><br />

                </div>

                <div>
                    <h4>Results</h4>
                    <p>Fixed Portion : <b>{fixedPortion}</b></p>
                    <p>Variable Portion : <b>{variablePortion}</b></p>
                    <p>Fixed Monthly Repayment : <b>{fixedMonthlyRepayment()}</b></p>
                    <p>Variable Weekly Repayment : <b>{variableWeeklyRepayment()}</b></p>
                    <p>Variable Fortnightly Repayment : <b>{variableFortnightlyRepayment()}</b></p>
                    <p>Total Interest : <b>{totalInterest()}</b></p>
                </div>
            </div>
        </div>);
};

export default Calculator;

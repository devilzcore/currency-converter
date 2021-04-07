import React, { useEffect, useState } from "react";
import Axios from 'axios'
import {
  Paper,
  TextField,
  FormControl,
  Select,
  Button
} from "@material-ui/core";

import "./styles.css";

const App = () => {
  const [ text1, setText1 ] = useState(1)
  const [ text2, setText2 ] = useState(1)
  const [ country, setCountry ] = useState([])
  const [ country2, setCountry2 ] = useState([]) 
  const [ value1, setValue1 ] = useState(1)
  const [ value2, setValue2 ] = useState(1)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const result = await Axios.get("http://data.fixer.io/api/latest?access_key=8cfc561aaf24e3aa13495f20de4358a5")
    setCountry(result.data.rates)
    setCountry2(result.data.rates)
  }

  function convert(e) {
    e.preventDefault()
    let num = (value2 / value1) * text1
    setText2(num)
  }

  return (
    <div>
      <Paper className="paper">
        <h3>Currency Converter</h3>
        <form action="" onSubmit={convert}>
          <div>
            <TextField variant="outlined" value={text1 || ""} onChange={(e)=>setText1(e.target.value)} autoComplete="off" />
            <FormControl className="dropdown" variant="outlined" onChange={(e)=>setValue1(e.target.value)}>
              <Select native>
                {Object.keys(country).map((value, index) => <option key={index} value={country[value]}>{value}</option>)}
              </Select>
            </FormControl>
          </div>
          <div>
            <TextField variant="outlined" value={text2 || ""}/>
            <FormControl className="dropdown" variant="outlined" onChange={(e)=>setValue2(e.target.value)}>
              <Select native>
                {Object.keys(country2).map((value, index) => <option key={index} value={country[value]}>{value}</option>)}
              </Select>
            </FormControl>
          </div>
          <Button type="submit"  className="button" variant="contained">
            Convert
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default App;

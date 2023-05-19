import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container ,Paper,Button} from '@material-ui/core';

 
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
     
    },
  },
}));

export default function Student() {
    const paperStyle={padding:'50px 20px', width:600,margin:"20px auto"}
    const[name,setName]=useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])
     const classes = useStyles();

  const handleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    console.log(student)
    fetch("http://localhost:8080/student/add",{
      method:"POST",
      headers:({"Content-Type":"application/json"},
                              {'Authorization': 'Basic ' + btoa('swati:swati')}),
      body:JSON.stringify(student)

  }).then(()=>{
    console.log("New Student added")
  })
}
// async componentDidMount(){
// try{        
//   const res = await fetch(url);
//   const data = await res.json();
//   this.setState({
//       articles: data.articles
//   });
// }
// catch(e) {
//   console.log("something is not working");
// }
// }

// useEffect(()=>{
//   var url = "http://localhost:8080/student/getAll",
//   credentials = btoa("swati:swati");
//   fetch(url,{
//    // origin:"*",
//    // method:"GET",
//     headers:({"Access-Control-Allow-Origin": "*"},
//     { "Authorization": `Basic ${credentials}`},
//     {"Content-Type":"application/json"}),
//    }
// )
//   .then(res=>res.json())
//   .then((result)=>{
//     setStudents(result);
//   }
// )
// },[])


useEffect(() => {
  const url = "http://localhost:8080/student/getAll";
  const credentials = btoa("swati:swati");

  fetch(url, {
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Basic ${credentials}`,
      "Content-Type": "application/json"
    })
  })
    .then(res => res.json())
    .then(result => {
      setStudents(result);
    });
}, []);

  return (

    <Container>
        <Paper elevation={3} style={paperStyle}>
            <h1 style={{color:"blue"}}><u>Add Student</u></h1>

    <form className={classes.root} noValidate autoComplete="off">
    
      <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Submit
</Button>
    </form>
   
    </Paper>
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>

      {students.map(student=>(
        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
         Id:{student.id}<br/>
         Name:{student.name}<br/>
         Address:{student.address}

        </Paper>
      ))
}


    </Paper>



    </Container>
  );
}

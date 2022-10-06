import Button from "./Button"

const Header = ({title , onAdd , onShow}) => {

  
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button 
        text={onShow?'Close':'Add'} 
        color={onShow?'red':'green'}  
        onClick={onAdd}/>
        
    </header>
  )
}
Header.defaultProps={
    title:"Task Tracker!",
}
export default Header
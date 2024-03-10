import React from "react";
import './singup.css'
const Singup=()=>{
    return (
       <>
        <div className="singup">
            <div>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor='name'>Name:</label></td>
                                <td ><input type="  text" name="name"></input></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='addharNumber'>Addhar:</label></td>
                                <td ><input type="number" name="addharNumber"></input></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='address'>Address:</label></td>
                                <td ><input type="text" name="address"></input></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='age'>Age:</label></td>
                                <td ><input type="number" name="age"></input></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='mobile'>Mobile:</label></td>
                                <td ><input type="  text" name="mobile"></input></td>
                            </tr>
                            <tr>
                                <td><label htmlFor='name'>Name:</label></td>
                                <td ><input type="  text" name="name"></input></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
       </>
    )
}
export default Singup;
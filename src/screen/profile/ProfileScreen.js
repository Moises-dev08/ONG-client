import React from 'react';
import './ProfileScreen.css';
import ButtonComponent from '../../component/profile/ButtonComponent';
import Swal from 'sweetalert2';
import { CONFIRM, CONFIRM_IS_CONFIRMED, CONFIRM_SUCCESS, DELETE_CONFIRM_TITLE_PROFILE } from '../../const/const';
import { ConfirmAlertDeleteButtonComponent } from '../../component/Alert/AlertComponent';
import { useHistory } from 'react-router';
import { deleteUser } from '../../services/querys/userServices';
import updateIsAuth from "../../store/isAuth/action";
import updateIsAdmin from "../../store/isAdmin/action";
import updateUser from '../../store/user/action';
import { connect } from 'react-redux'
import { Box } from '@material-ui/core';

function ProfileScreen(props) {
    const user_data = props.user.user
    let history = useHistory();

    const onEditProfileClick = () => {
        history.push("/edit-user");
    };
    const onDeleteAccountClick = () => {
        ConfirmAlertDeleteButtonComponent(DELETE_CONFIRM_TITLE_PROFILE).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(CONFIRM, CONFIRM_IS_CONFIRMED, CONFIRM_SUCCESS);
                deleteUser(user_data.id);
                props.updateIsAdmin(false)
                props.updateIsAuth(false)
                history.push("/");
            }
        });
    };

    return (
        <Box m={2} p={2}>
            <h3>{`Perfil de ${user_data.firstName}`}</h3>
            <ul className="container list">
                <li>{user_data.firstName} {user_data.lastName}</li>
                <li>{user_data.email}</li>
            </ul>
            <div className="flex-row">
                <ButtonComponent buttonText={"Editar perfil"}
                    buttonType={"primary"} onClickAction={onEditProfileClick} />
                <ButtonComponent buttonText={"Borrar cuenta"}
                    buttonType={"danger"} onClickAction={onDeleteAccountClick} />
            </div>
        </Box>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps,{updateIsAdmin,updateIsAuth,updateUser})(ProfileScreen);
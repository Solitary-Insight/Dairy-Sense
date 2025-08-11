export const navigateUserBasedOnCookie = async (
    {
        fields,
        onAdministarterAccount=()=>{console.log('Administrator account')},
        onOwnerAccount=()=>{console.log('Owner account')},
        onNoUserFound = () => { console.log("NO USER FOUND") },
        onUserWithNoOTPVerification = () => { console.log("USER WITH NO OTP VERIFICATION") },
        onUserWithOTPVerification = () => { console.log("USER WITH  OTP VERIFICATION") },

        onUserWithFarmsFound = () => { console.log("USER WITH  FARMS") },
        onUserWithNoFarmFound = () => { console.log("USER WITH NO FARM") },



    }) => {


    const { user, registered_farms } = fields


    if (user == null) {
        onNoUserFound()
        return;
    } else {

        if(user.user_type=="administrator"){
            
            onAdministarterAccount()
        }else{
            onOwnerAccount()
        }
        if (!user.otp_verified) {
            onUserWithNoOTPVerification()
        } else {
            onUserWithOTPVerification(user)
        }
    }
    if (registered_farms.length == 0) {
        onUserWithNoFarmFound()
        return;

    }
    else {

        onUserWithFarmsFound(registered_farms)

    }

}
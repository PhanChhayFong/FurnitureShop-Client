import ApiService from "../services/api-service";
import axios from "axios";
import Swal from "sweetalert2";
window.Swal = Swal;
function _(obj) {
  return document.getElementById(obj).value;
}
class Alart {
  refresh = () => window.location.reload(true);
  eye = (e) => {
    return !e;
  };
  alartDelete = (tb, id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        ApiService.delete(tb, id);
        this.refresh();
      }
    });
  };
  alartSwap = (error) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Can't Move " + error,
    });
  };
  alartSave = (changed) => {
    if (changed) {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
        console.log(result);
        return result;
      });
    }
  };
  alartCreate = (Page, required) => {
    Swal.fire({
      icon: "error",
      title: `${Page} Can't be Created`,
      text: `${required} are required!!!`,
    });
  };
  alartPasswordError = (fill) => {
    Swal.fire({
      icon: "error",
      title: `Error !!!`,
      text: `Please Enter ${
        fill ? "Confirm Password Again" : "Username, Email, Password"
      } !!!`,
    });
  };
  alartLoginSuccess = () => {
    Swal.fire({
      icon: "success",
      title: `Login Success`,
    });
  };
  alartLoginError = (status, error) => {
    Swal.fire({
      icon: "error",
      title: `Error ${status} !!!`,
      text: `${error}`,
    });
  };
  alartLoginEmpty = (error) => {
    Swal.fire({
      icon: "error",
      title: "Can't Login",
      text: `Please Enter Your ${error}`,
    });
  };
  alartChangePassword = async (id) => {
    await Swal.fire({
      title: "Change Password",
      html:
        '<input type="password" id="swal-input1" className="swal2-input" placeholder="Enter Old Password">' +
        '<input type="password" id="swal-input2" className="swal2-input" placeholder="Enter New Password">' +
        '<input type="password" id="swal-input3" className="swal2-input" placeholder="Confirm New Password">',
    });

    if (
      _("swal-input1") !== "" &&
      _("swal-input2") !== "" &&
      _("swal-input3") !== "" &&
      _("swal-input2") == _("swal-input3")
    )
      ApiService.updatePassword("users/chPass", id, _("swal-input1"), {
        password: `${_("swal-input2")}`,
      });
    else if (_("swal-input2") !== _("swal-input3"))
      this.alartPasswordError(true);
    else this.alartLoginEmpty("Password");
  };
  alartForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password?...",
      input: "email",
      inputLabel: "Please Input Your email address",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Submit",
    });

    if (email) {
      const res = await axios
        .post(
          `http://localhost:5000/api/v1/users/fgPassword`,
          {
            email: email,
          },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        )
        .catch((err) => {
          if (err.response)
            return this.alartLoginError(err.response.status, err.response.data);
        });
      // const item = {
      //   user: res.data.user,
      //   token: res.data.token,
      // };
      // localStorage.setItem("fgPass", JSON.stringify(item));
      await Swal.fire({
        title: "Change Password",
        html:
          '<input type="password" id="swal-input1" className="swal2-input" placeholder="Enter New Password">' +
          '<input type="password" id="swal-input2" className="swal2-input" placeholder="Confirm New Password">',
      });

      if (
        _("swal-input1") !== "" &&
        _("swal-input2") !== "" &&
        _("swal-input1") == _("swal-input2")
      )
        ApiService.updatePassword("users/chfgPass", res.data.user.id, "", {
          password: `${_("swal-input1")}`,
        });
      else if (_("swal-input1") !== _("swal-input2"))
        this.alartPasswordError(true);
      else this.alartLoginEmpty("New Password");
    }
  };

  alartOrderSuccess = () => {
    Swal.fire({
      icon: "success",
      title: `Thank For Order`,
    });
  };
}
export default new Alart();

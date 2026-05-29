  const handlePhone = (event) => {
    let input = event.target;
    input.value = maskPhone(input.value);
  };

  const maskPhone = (v) => {
    v = v.replace(/\D/g, "");
    v = v.substring(0, 11);

    if (v.length === 0) return "";
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 6) return `(${v.substring(0, 2)}) ${v.substring(2)}`;
    if (v.length <= 10)
      return `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
    return `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
  };

  const apptPhoneInput = document.getElementById("telefone");
  const apptPhoneAltInput = document.getElementById("telefone_adicional");

  if (apptPhoneInput) {
    apptPhoneInput.addEventListener("input", handlePhone);
  }
  if (apptPhoneAltInput) {
    apptPhoneAltInput.addEventListener("input", handlePhone);
  }
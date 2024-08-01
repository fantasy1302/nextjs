export default function sendCf7Form() {
  function jsonToFormData(json) {
    try {
      const formData = new FormData();

      for (let key in json) {
        formData.append(key, json[key]);
      }

      return formData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function Cf7FormWrapper( siteUrl, formId, url) {
    const isSent = false;
    let isLoading = false;
    let hasError = null;

    const apiUrl =
      url ||
      `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback/`;

      isLoading = true;
      hasError = null;

      const formData = {
        "name": "Test",
        "email": "iceberg@gmail.com",
        "subject": "Test",
        "message": "Test",
      }

      fetch(apiUrl, {
        method: "POST",
        body: jsonToFormData(formData),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          if (resp.status !== "mail_sent") throw resp.message;

        })
        .catch((error) => {
          hasError = error;
        })
        .finally(() => {
          isLoading = false;
        });

  }

  const siteUrl = "https://grantix.local";
  const formId = "8cf6092";
  const url = ""; // Optional custom URL

  Cf7FormWrapper( siteUrl, formId, url);

}



var fileInput = document.getElementById('file');
  fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var allowedExtensions = ['doc', 'docx'];
    var fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert('Error: Only .doc and .docx files are allowed.');
      fileInput.value = '';
    }
  });
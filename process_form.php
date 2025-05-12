<?php
// Initialiser les variables d'erreur et de succès
$errors = [];
$success = false;

// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    
    // Valider les entrées
    if (empty($name)) {
        $errors[] = 'Le nom est requis';
    }
    
    if (empty($email)) {
        $errors[] = 'L\'email est requis';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'L\'email n\'est pas valide';
    }
    
    if (empty($message)) {
        $errors[] = 'Le message est requis';
    }
    
    // Si aucune erreur, procéder à l'envoi du mail
    if (empty($errors)) {
        $to = "aylan.haddouchi@edu.univ-fcomte.fr"; // Votre adresse email
        $subject = "Message de contact de $name";
        $email_content = "Nom: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        // Tentative d'envoi d'email
        if (mail($to, $subject, $email_content, $headers)) {
            $success = true;
            
            // Réinitialiser les valeurs du formulaire
            $name = $email = $message = '';
        } else {
            $errors[] = 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.';
        }
    }
    
    // Renvoyer une réponse JSON pour les requêtes AJAX
    if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
        header('Content-Type: application/json');
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Votre message a été envoyé avec succès!']);
        } else {
            echo json_encode(['success' => false, 'errors' => $errors]);
        }
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Traitement du formulaire</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #1a1a1a;
            color: #ffffff;
            line-height: 1.6;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
        }
        .message {
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .success {
            background-color: rgba(46, 204, 113, 0.2);
            border: 1px solid #2ecc71;
        }
        .error {
            background-color: rgba(231, 76, 60, 0.2);
            border: 1px solid #e74c3c;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <?php if (!empty($errors)): ?>
        <div class="message error">
            <h2>Erreur lors de l'envoi du message:</h2>
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?php echo $error; ?></li>
                <?php endforeach; ?>
            </ul>
            <p><a href="index.html#contact">Retour au formulaire</a></p>
        </div>
    <?php elseif ($success): ?>
        <div class="message success">
            <h2>Message envoyé avec succès!</h2>
            <p>Merci de m'avoir contacté. Je vous répondrai dès que possible.</p>
            <p><a href="index.html">Retour à l'accueil</a></p>
        </div>
    <?php else: ?>
        <div class="message">
            <h2>Redirection...</h2>
            <p>Si vous n'êtes pas redirigé automatiquement, <a href="index.html#contact">cliquez ici</a>.</p>
        </div>
        <script>
            window.location.href = 'index.html#contact';
        </script>
    <?php endif; ?>
</body>
</html> 
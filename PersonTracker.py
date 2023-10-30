import cv2

# Initialize the camera (0 is usually the default camera)
video_path = "C:/Users/suren/OneDrive/Desktop/dataset/model.mp4"
cap = cv2.VideoCapture(video_path)

# Create a background subtractor
fgbg = cv2.createBackgroundSubtractorMOG2()

# Initialize variables to track persons and bags
person_inside = False
bags_inside = 0

while True:
    ret, frame = cap.read()

    if not ret:
        break

    # Apply background subtraction to detect moving objects
    fgmask = fgbg.apply(frame)

    # Perform morphological operations to remove noise
    fgmask = cv2.morphologyEx(fgmask, cv2.MORPH_OPEN, None)

    # Find contours of moving objects
    contours, _ = cv2.findContours(fgmask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Initialize flags for person and bags
    person_detected = False
    bags_detected = 0

    for contour in contours:
        # Calculate the area of the contour
        area = cv2.contourArea(contour)

        # Check if the contour represents a person (you may need to adjust the area threshold)
        if 500 < area < 5000:
            person_detected = True

        # Check if the contour represents a bag (you may need to adjust the area threshold)
        elif area < 500:
            bags_detected += 1

    # If a person is detected and bags are present, the person is allowed to enter
    if person_detected and bags_detected > 0:
        person_inside = True
        bags_inside = bags_detected
        print("Person allowed to enter. Bags detected:", bags_inside)

    # If a person is detected but no bags are present, issue an alert
    elif person_detected and bags_detected == 0:
        person_inside = True
        bags_inside = 0
        print("Alert: Person entered without bags!")

    # If no person is detected but bags are inside, issue an alert
    elif not person_detected and bags_inside > 0:
        print("Alert: Person left without bags!")

    # If neither person nor bags are detected, reset the flags
    else:
        person_inside = False
        bags_inside = 0

    # Show the frame
    cv2.imshow("Venue Security", frame)

    # Press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close the OpenCV window
cap.release()
cv2.destroyAllWindows()

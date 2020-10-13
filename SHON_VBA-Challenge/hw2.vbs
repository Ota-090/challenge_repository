Sub part1():
Dim i As Double
Dim startstock As Double
Dim closestock As Double
Dim volstock As Double
Dim counter As Double
Dim stockname As String


counter = 2
volstock = 0
stockname = "start"


Cells(2, 15).Value = "Greatest % increase"
Cells(3, 15).Value = "Greatest % decrease"
Cells(4, 15).Value = "Greatest total volume"
Cells(1, 16).Value = "Ticker"
Cells(1, 17).Value = "Value"
Cells(1, 9).Value = "Ticker"
Cells(1, 10).Value = "Yearly Change"
Cells(1, 11).Value = "Percent Change"
Cells(1, 12).Value = "Total stock Volume"




For i = 2 To 797712
    volstock = volstock + Cells(i, 7).Value
    
    If Cells(i, 1).Value <> stockname Then
    startstock = Cells(i, 3).Value
    Cells(counter, 9).Value = Cells(i, 1).Value
    stockname = Cells(i, 1).Value
    If startstock = 0 Then
    startstock = 99999
    End If
    
    End If
    
    
    If stockname <> Cells(i + 1, 1).Value Then
    closestock = Cells(i, 6).Value
    Cells(counter, 10).Value = closestock - startstock
    Cells(counter, 11).Value = Cells(counter, 10).Value / startstock

    closestock = 0
    Cells(counter, 12).Value = volstock
    volstock = 0
    counter = counter + 1
    End If
    
Next i


End Sub



Sub findgreatest():
Dim i As Integer
Dim great_decrease As Double
Dim great_increase As Double
Dim great_vol As Double
great_decrease = Cells(2, 11).Value
great_increase = Cells(2, 11).Value
great_vol = Cells(2, 12).Value


For i = 2 To 3005
    If Cells(i, 11).Value > great_increase Then
        great_increase = Cells(i, 11).Value
        Cells(2, 16).Value = Cells(i, 9).Value
    End If

    If Cells(i, 11).Value < great_decrease And Cells(i, 10).Value > -999 Then
            great_decrease = Cells(i, 11).Value
            Cells(3, 16).Value = Cells(i, 9).Value
    End If
    
    If Cells(i, 12).Value > great_vol Then
        great_vol = Cells(i, 12).Value
        Cells(4, 16).Value = Cells(i, 9).Value
    End If

Next i

Cells(2, 17).Value = great_increase
Cells(3, 17).Value = great_decrease
Cells(4, 17).Value = great_vol
End Sub

Sub color():
Dim i As Integer

For i = 2 To 3005

If Cells(i, 10).Value > 0 Then
    Cells(i, 10).Interior.ColorIndex = 4
Else
    Cells(i, 10).Interior.ColorIndex = 3
    
End If

Next i

End Sub

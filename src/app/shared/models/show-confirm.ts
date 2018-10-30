// export showConfirm

// showConfirm(data:IMassageData) {
//     console.log('enter showConfirm')
//     this.SimpleModalService.removeAll()
//     this.SimpleModalService.addModal(ConfirmComponent, {
//       title: data.titleStr,
//       message: data.bodyStr})
//       .subscribe((isConfirmed) => {
//         this.confirmResult = isConfirmed;
//         if (this.confirmResult && data.actionType === 1)
//         {        
//           this.SimpleModalService.removeModal
//           this.router.navigate(['/app-products']);
//         } 
        
//         if(this.confirmResult && data.actionType === 2 )
//         {
//           console.log('data.actionType === 2')
//           // this.isOkToOverLimit = true;
//           this.progDataService.changeCanGoOverLimit.next(false)
//           // this.massageOverLimit.isOkToOverLimit = true;
//           this.SimpleModalService.removeModal
//           this.router.navigate(['/shopping-cart']);
         
//         } else if (!this.confirmResult)
//         {
//           this.progDataService.changeCanGoOverLimit.next(true)
//           this.SimpleModalService.removeModal
//         }
      
//         if(this.confirmResult && data.actionType === 3 )
//         {
//           console.log('data.actionType === 3')
//           this.addExtraItem = true;
//           this.progDataService.updateAddExtraItem(true);
//           // this.progDataService.isOkToAddExstraItem = true;
//           this.SimpleModalService.removeModal
//         }else {
//           // this.progDataService.isOkToAddExstraItem = false;
//           // this.progDataService.updateAddExtraItem(false);
//           this.SimpleModalService.removeModal
//         }
//         if(this.confirmResult && data.actionType === 10)
//           this.SimpleModalService.removeModal
//     });
//   }